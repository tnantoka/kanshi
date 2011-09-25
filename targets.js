/* Monitoring settings */

module.exports = {

  // credential for monitoring view
  user: 'admin',
  pass: 'pass', 
  
  // Global settings
  interval: 300, // Check per 5 min 
  port: 3000,

  // Targets for monitoring
  targets: {

    'looseleafjs.org': {
      url: 'http://looseleafjs.org/', 
      timeout: 5,
      retry: 3,
      trap: [
        function() {
          console.log('looseleafjs.org is down');
        },
      ]
    },

    'DailyNode': {
      url: 'http://blog.looseleafjs.org/', 
      timeout: 5,
      retry: 3,
      trap: [
        function() {
          console.log('DailyNode is down');
        },
      ]
    },

    /* for test server */
    /*
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
    */
  }

};
