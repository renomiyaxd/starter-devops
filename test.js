// test.js - Simple test without external dependencies
const http = require('http');

console.log('🧪 Starting to run simple tests...');

// Test 1: Check if the server starts
console.log('Test 1: Server startup test');
const server = require('./app.js');

// Give server time to start
setTimeout(() => {
  // Test 2: Check health endpoint
  console.log('Test 2: Health endpoint test');
  
  const options = {
    hostname: 'localhost',
    port: process.env.PORT || 3000,
    path: '/health',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const health = JSON.parse(data);
        if (health.status === 'healthy') {
          console.log('✅ Health check passed');
          console.log('✅ All tests passed!');
          process.exit(0);
        } else {
          console.log('❌ Health check failed');
          process.exit(1);
        }
      } catch (error) {
        console.log('❌ Invalid health response');
        process.exit(1);
      }
    });
  });

  req.on('error', (error) => {
    console.log('❌ Test failed:', error.message);
    process.exit(1);
  });

  req.end();
}, 2000);