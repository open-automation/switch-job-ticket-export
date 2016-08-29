// Helpers
var forEach = function(array, callback){
   var currentValue, index;
   for (i = 0; i < array.length; i += 1) {
      if(typeof array[i] == "undefined"){
         currentValue = null;
      } else {
         currentValue = array[i];
      }
      index = i;
      callback(currentValue, i, array);
    }
}

// XML helper function
var createElement = function(parent, doc, key, value, attributeAsKey){

	if(typeof(attributeAsKey) == 'undefined'){
		attributeAsKey = false;
	}

	var parentLength, index, child;
	parentLength = parent.getChildNodes().length;
	index = 'Key'+parentLength;

	//s.log(2, "parentLength: "+parentLength);

	if(attributeAsKey == true){
		child = doc.createElement(index, null);
	} else {
		child = doc.createElement(key, null);
	}

	// Set (sometimes) redundant key
	child.addAttribute("key", null, key);

	parent.appendChild(child);

	if(value){
		text = doc.createText( value );
		child.appendChild(text);
	}

	return child;
}



// Writing job ticket
var writeJobTicket = function( s : Switch, job : Job ){

    var getPrivateData = function(parent, doc){
        var privateDataTags = job.getPrivateDataTags();

		  // Make parent PD node
		  var pdParent =  createElement(parent, doc, 'getPrivateData', null);

        if(privateDataTags.length > 0){
           s.log(-1, privateDataTags.length + " private data tags found.");
			forEach(privateDataTags, function(tag, i){
				// Create it
				createElement(pdParent, doc, tag, job.getPrivateData(tag), true);
			});
        }

        return true;
    }

	var getDatasets = function(parent, doc){

		var datasetTags = job.getDatasetTags();

	    if(datasetTags.length > 0){
	        s.log(-1, datasetTags.length + " external datasets found.");
	    }


		// Make parent dataset node
		var datasetParent =  createElement(parent, doc, 'getDatasets', null);

		forEach(datasetTags, function(tag, i){

		    createElement(datasetParent, doc, tag, tag, true);
		});


        return true;
    }

	// Write XML job ticket
	var doc = new Document();
	var root = doc.createElement("JobTicket");
	doc.setDocumentElement(root);

	createElement(root, doc, "getHierarchyPath", job.getHierarchyPath());
	createElement(root, doc, "getEmailAddresses", job.getEmailAddresses());
	createElement(root, doc, "getEmailBody", job.getEmailBody());
	createElement(root, doc, "getJobState", job.getJobState());
	createElement(root, doc, "getUserName", job.getUserName());
	createElement(root, doc, "getUserFullName", job.getUserFullName());
	createElement(root, doc, "getUserEmail", job.getUserEmail());
	createElement(root, doc, "getPriority", job.getPriority());
	createElement(root, doc, "getArrivalStamp", job.getArrivalStamp());
	createElement(root, doc, "getName", job.getName());
	createElement(root, doc, "getUniqueNamePrefix", job.getUniqueNamePrefix());
	createElement(root, doc, "getExtension", job.getExtension());

	// Do private data
	getPrivateData(root, doc);
	getDatasets(root, doc);

	// Save XML as file
	var jobTicketPath = job.createPathWithName("ticket.xml");

	doc.save(jobTicketPath);

	s.log(-1, "Job ticket written to: " + jobTicketPath);

   // move job ticket
   return jobTicketPath;
};


function jobArrived( s : Switch, job : Job )
{
	var job_ticket_path = writeJobTicket(s, job);

	job.sendToLog(1, job_ticket_path);
	job.sendToData(1, job.getPath());

	return;
}
