/* Monitoring settings */

module.exports = {

  // credential for monitoring view
  user: 'admin',
  pass: 'pass', 
  
  // Global settings
  interval: 10, // Check per 10sec
  port: 3000,

  // Targets for monitoring
  targets: {

    /* templete */
    /*
    target_name: {
      url: 'http://', 
      timeout: 2,
      retry: 3,
      trap: [
        function() {
        },
      ]
    },
    */

    /* for test server */
    localhost: {
      url: 'http://localhost:3001/',  
      timeout: 2,
      retry: 3,
      trap: [
        function() {
          console.log('Run trap for localhost.');
        },
      ]
    },
    timeout2: {
      url: 'http://localhost:3001/sleep3',  
      timeout: 2,
      retry: 3,
      trap: [
        function() {
          console.log('Run trap for timeout2.');
        },
      ]
    },
    timeout3: {
      url: 'http://localhost:3001/sleep3',  
      timeout: 3,
      retry: 3,
      trap: [
        function() {
          console.log('Run trap for timeout3.');
        },
      ]
    },
    503: {
      url: 'http://localhost:3001/503',  
      timeout: 3,
      retry: 3,
      trap: [
        function() {
          console.log('Run trap for 503.');
        },
      ]
    },
  }

};
