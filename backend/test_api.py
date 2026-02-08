#!/usr/bin/env python3
"""Quick test for KARAN-KAVACH API fixes"""
import urllib.request
import json
import time

BASE = 'http://localhost:5001/api'

def get(endpoint):
    r = urllib.request.urlopen(f'{BASE}{endpoint}')
    return json.loads(r.read())

def post(endpoint, data=None):
    body = json.dumps(data or {}).encode()
    req = urllib.request.Request(f'{BASE}{endpoint}', data=body, 
                                 headers={'Content-Type': 'application/json'}, method='POST')
    r = urllib.request.urlopen(req)
    return json.loads(r.read())

passed = 0
failed = 0

def test(name, condition, detail=''):
    global passed, failed
    if condition:
        print(f'  ✅ {name}')
        passed += 1
    else:
        print(f'  ❌ {name} — {detail}')
        failed += 1

print('=== TEST 1: Ring Level Detection ===')
d = get('/metrics')
ring = d.get('ring_level', -1)
caps = d.get('ring_capabilities', {})
print(f'  Ring Level: {ring}')
print(f'  Root: {caps.get("root_access")}, /dev/mem: {caps.get("dev_mem")}, MSR: {caps.get("msr_access")}, perf: {caps.get("perf_event")}')
test('Ring level is a number', isinstance(ring, int), f'got {type(ring)}')
test('Capabilities returned', len(caps) > 0, 'empty capabilities')
test('Ring level <= 3', ring <= 3)
print()

print('=== TEST 2: Simulate Threat ===')
d = post('/simulate_threat', {'threat_type': 'Buffer Overflow'})
test('Threat created', d.get('success') == True)
fake_pid = d.get('pid')
test('Got PID', fake_pid is not None, 'no pid returned')
print(f'  Simulated PID: {fake_pid}, Name: {d.get("name")}')
print()

print('=== TEST 3: Threat in Process List ===')
d = get('/processes')
threats = [p for p in d['processes'] if p['status'] == 'THREAT']
sim_count = d.get('simulated_count', 0)
test('Threat appears in /api/processes', len(threats) >= 1, f'found {len(threats)} threats')
test('simulated_count >= 1', sim_count >= 1, f'got {sim_count}')
found = any(t['pid'] == fake_pid for t in threats)
test(f'PID {fake_pid} found in threats', found)
print()

print('=== TEST 4: Integrity Reflects Threat ===')
d = get('/integrity')
test('Threat count >= 1', d.get('threat_count', 0) >= 1, f'got {d.get("threat_count")}')
test('Score < 100', d.get('score', 100) < 100, f'got {d.get("score")}')
print(f'  Score: {d["score"]}, Status: {d["status"]}, Threats: {d["threat_count"]}')
print()

print(f'=== TEST 5: Kill Simulated Threat (PID {fake_pid}) ===')
d = post(f'/kill/{fake_pid}')
test('Kill succeeded', d.get('success') == True, d.get('message', ''))
test('Recognized as simulated', d.get('simulated') == True, f'simulated={d.get("simulated")}')
print(f'  Message: {d.get("message")}')
print()

print('=== TEST 6: Threat Removed ===')
d = get('/processes')
threats = [p for p in d['processes'] if p['status'] == 'THREAT']
sim_count = d.get('simulated_count', 0)
test('No simulated threats left', sim_count == 0, f'still {sim_count}')
pid_gone = not any(t['pid'] == fake_pid for t in threats)
test(f'PID {fake_pid} gone from list', pid_gone)
print()

print('=== TEST 7: Integrity Restored ===')
d = get('/integrity')
test('Threat count is 0', d.get('threat_count', -1) == 0, f'got {d.get("threat_count")}')
print(f'  Score: {d["score"]}, Status: {d["status"]}')
print()

print('=== TEST 8: Kill All Threats ===')
post('/simulate_threat', {'threat_type': 'Buffer Overflow'})
post('/simulate_threat', {'threat_type': 'Return Oriented Programming (ROP)'})
post('/simulate_threat', {'threat_type': 'Kernel Bypass'})
d = get('/processes')
threats_before = d.get('simulated_count', 0)
test('3 threats created', threats_before == 3, f'got {threats_before}')
d = post('/kill_all_threats')
test('Kill all succeeded', d.get('success') == True)
d = get('/processes')
test('All threats cleared', d.get('simulated_count', 0) == 0, f'still {d.get("simulated_count")}')
print()

print(f'═══════════════════════════════════')
print(f'  RESULTS: {passed} passed, {failed} failed')
print(f'═══════════════════════════════════')
