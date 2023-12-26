document.addEventListener('DOMContentLoaded', function () {
	// Get the container and buttons
	const container = document.querySelector('.mainContainer');
	const addButton = document.querySelector('.addButton');
    
	loadEntries()
	
	// Add event listener for the "+" button
	addButton.addEventListener('click', function () {
	  addNewEntry();
	});
    
	// Add event listener for "Enter" key press in text input
	container.addEventListener('keyup', function (event) {
	  if (event.target && event.target.className === 'ctmText' && event.key === 'Enter') {
		addNewEntryAfter(event.target.parentNode);
	  }
	});
	
	container.addEventListener('keyup', function (event) {
	  if (event.target && event.target.className === 'ctmText' && event.key != 'Enter') {
		saveEntries()
	  }
	});

	// ---
	
	
	function saveEntries() {
		// generate list
		entries = new Array()
		entryElements = container.querySelectorAll(".entry")
		for (let index = 0; index < entryElements.length; index++) {
			const entry = entryElements[index];
			text = entry.querySelector(".ctmText").value
			checked = entry.querySelector(".ctmCheckbox").checked
			entries.push([text,checked])
		}
		for (let index = 0; index < entries.length; index++) {
			const text = entries[index][0];
			if (text == "") {
				entries.splice(index,1)
			}
		}
		console.log(entries)
		localStorage.setItem("jcmsTODO",JSON.stringify(entries))
	}	
	
	function loadEntries() {
		rawData = localStorage.getItem("jcmsTODO")
		entries = JSON.parse(rawData)
		console.log(entries)
		for (let index = 0; index < entries.length; index++) {
			const text = entries[index][0];
			const checked = entries[index][1];
			entry = addNewEntry()
			entry.querySelector(".ctmText").value = text
			entry.querySelector(".ctmCheckbox").checked = checked
		}
	}
	
	// ---
	
	function addNewEntry() {
	  // Create a new entry
	  const newEntry = createEntry();  
	  // Append the new entry to the container
	  container.insertBefore(newEntry, addButton);
	  // Focus on the new text input
	  newEntry.querySelector('.ctmText').focus();
	  return newEntry
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
	  checkbox.addEventListener('click', function () {
		saveEntries();
	  });
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
  });
  