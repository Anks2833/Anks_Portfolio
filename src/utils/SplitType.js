/**
 * Simple text splitting utility inspired by SplitType
 * This is a minimal implementation to avoid needing to install the full library
 */
class SplitType {
    constructor(target, options = {}) {
      this.elements = typeof target === 'string' 
        ? document.querySelectorAll(target) 
        : [target];
      
      this.options = {
        types: options.types || 'chars,words,lines',
        ...options
      };
      
      this.chars = [];
      this.words = [];
      this.lines = [];
      
      this.init();
    }
    
    init() {
      const types = this.options.types.split(',');
      
      this.elements.forEach(element => {
        // Store original content for revert
        element.originalHTML = element.innerHTML;
        
        // Get text content
        const text = element.textContent;
        
        // Clear the element
        element.innerHTML = '';
        
        if (types.includes('chars') || types.includes('words')) {
          // Split text into words and chars
          const words = text.split(' ');
          
          words.forEach((word, wordIndex) => {
            // Create word element
            const wordElement = document.createElement('span');
            wordElement.className = 'split-word';
            wordElement.style.display = 'inline-block';
            wordElement.style.position = 'relative';
            
            if (wordIndex > 0) {
              // Add space before word (except first word)
              element.appendChild(document.createTextNode(' '));
            }
            
            if (types.includes('chars')) {
              // Split word into characters
              const chars = word.split('');
              
              chars.forEach(char => {
                const charElement = document.createElement('span');
                charElement.className = 'split-char';
                charElement.style.display = 'inline-block';
                charElement.style.position = 'relative';
                charElement.textContent = char;
                
                this.chars.push(charElement);
                wordElement.appendChild(charElement);
              });
            } else {
              // Just use the word as-is
              wordElement.textContent = word;
            }
            
            this.words.push(wordElement);
            element.appendChild(wordElement);
          });
        } else {
          // No splitting, restore the text
          element.textContent = text;
        }
        
        if (types.includes('lines')) {
          // This would require layout knowledge to do properly
          // For simplicity, we'll just wrap each line in a span if it contains <br>
          const lineElements = [];
          const lines = element.innerHTML.split('<br>');
          
          if (lines.length > 1) {
            element.innerHTML = '';
            
            lines.forEach((line, index) => {
              const lineElement = document.createElement('span');
              lineElement.className = 'split-line';
              lineElement.style.display = 'block';
              lineElement.innerHTML = line;
              
              if (index < lines.length - 1) {
                lineElement.appendChild(document.createElement('br'));
              }
              
              this.lines.push(lineElement);
              lineElements.push(lineElement);
              element.appendChild(lineElement);
            });
          }
        }
      });
    }
    
    // Revert the split
    revert() {
      this.elements.forEach(element => {
        if (element.originalHTML) {
          element.innerHTML = element.originalHTML;
        }
      });
      
      this.chars = [];
      this.words = [];
      this.lines = [];
    }
  }
  
  export default SplitType;