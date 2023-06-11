document.addEventListener("DOMContentLoaded", function() {
    var submitButton = document.getElementById("submitButton");
    var generateSeedButton = document.getElementById("generateSeedButton");
    var nameInput = document.getElementById("nameInput");
    var output = document.getElementById("output");
  
    submitButton.addEventListener("click", function() {
      var name = nameInput.value;
      output.textContent = "Hello, " + name + "!";
    });
  
    generateSeedButton.addEventListener("click", function() {
      var generatedSeed = generateSeed();
      nameInput.value = generatedSeed;
    });
  
    function generateSeed() {
      // Implement your logic to generate the seed here
      // Example implementation:
      var seed = Math.random().toString(36).substr(2, 8);
      return seed;
    }
  });
  