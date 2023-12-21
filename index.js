document.addEventListener('DOMContentLoaded', function () {
	// Get the container and buttons
	const container = document.querySelector('.mainContainer');
	const addButton = document.querySelector('.addButton');
  
	// Load entries from localStorage on page load
	loadEntries();
  
	// Add event listener for the "+" button
	addButton.addEventListener('click', function () {
	  addNewEntry();
	  saveEntries();
	});
  
	// Add event listener for the "-" buttons
	container.addEventListener('click', function (event) {
	  if (event.target && event.target.className === 'ctmButton') {
		// Remove the entry when "-" button is clicked
		const entryToRemove = event.target.parentNode;
		container.removeChild(entryToRemove);
		saveEntries();
	  }
	});
  
	// Add event listener for "Enter" key press in text input
	container.addEventListener('keyup', function (event) {
	  if (event.target && event.target.className === 'ctmText' && event.key === 'Enter') {
		addNewEntryAfter(event.target.parentNode);
		saveEntries();
	  }
	});
  
	function addNewEntry() {
	  // Create a new entry
	  const newEntry = createEntry();
  
	  // Append the new entry to the container
	  container.insertBefore(newEntry, addButton);
  
	  // Focus on the new text input
	  newEntry.querySelector('.ctmText').focus();
	}
  
	function addNewEntryAfter(previousEntry) {
	  // Create a new entry
	  const newEntry = createEntry();
  
	  // Insert the new entry after the previous entry
	  container.insertBefore(newEntry, previousEntry.nextSibling);
  
	  // Focus on the new text input
	  newEntry.querySelector('.ctmText').focus();
	}
  
	function createEntry() {
	  // Create a new entry
	  const newEntry = document.createElement('div');
	  newEntry.className = 'entry';
  
	  // Create checkbox
	  const checkbox = document.createElement('input');
	  checkbox.type = 'checkbox';
	  checkbox.className = 'ctmCheckbox';
  
	  // Create text input
	  const textInput = document.createElement('input');
	  textInput.type = 'text';
	  textInput.className = 'ctmText';
  
	  // Create "-" button for the new entry
	  const removeButton = document.createElement('button');
	  removeButton.className = 'ctmButton';
	  removeButton.innerText = '-';
	  removeButton.addEventListener('click', function () {
		container.removeChild(newEntry);
		saveEntries();
	  });
  
	  // Append elements to the new entry
	  newEntry.appendChild(checkbox);
	  newEntry.appendChild(textInput);
	  newEntry.appendChild(removeButton);
  
	  return newEntry;
	}
  
	function saveEntries() {
	  // Save entries to localStorage
	  const entries = Array.from(container.children).map(entry => ({
		checked: entry.querySelector('.ctmCheckbox').checked,
		text: entry.querySelector('.ctmText').value
	  }));
  
	  localStorage.setItem('todo_entries', JSON.stringify(entries));
	}
  
	function loadEntries() {
	  // Load entries from localStorage
	  const savedEntries = localStorage.getItem('todo_entries');
  
	  if (savedEntries) {
		const entries = JSON.parse(savedEntries);
  
		entries.forEach(entry => {
		  const newEntry = createEntry();
		  newEntry.querySelector('.ctmCheckbox').checked = entry.checked;
		  newEntry.querySelector('.ctmText').value = entry.text;
  
		  container.appendChild(newEntry);
		});
	  }
	}
  });
  