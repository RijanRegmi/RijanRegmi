import { describe, it } from 'node:test';
import assert from 'node:assert';
import { healthService } from '../services/health.service';

describe('HealthService Unit Test', () => {
  it('should return health status with services information', () => {
    const health = healthService.getHealth();
    assert.ok(health.status);
    assert.ok(health.timestamp);
    assert.ok(health.services);
    assert.ok(health.services.database);
  });
});
