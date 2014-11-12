//this function create a nback Test based on the list of letters 
//and the true_answers which are the moment when the user should detect
//the nBack letter
function Test(version, list, true_answers){
	this.list = [];
	this.length = 0;
	this.true_answers = [];
	this.user_answers = [0,0,0,0,0,0,0,0];

	this.init = function(){
		this.list = list;
		this.length=this.list.length;
		this.true_answers = true_answers;
		this.generate_slides();
	}

	//Generate the slides with the template given by RevealJS.
	//The version param allows us to detect which Test are we doing
	//if you decide to do several test in a row.
	this.generate_slides = function (){
		var t="<section data-autoslide=5000 version="+ version + ">The test gonna start soon</section>";
		var i=1;
		t+="<section data-autoslide=1500 version=" + version + ">Ready</section>"
		$.each(this.list, function(index, value ) {
			t += "<section index=" + i + " version=" + version + "><h1>" + value + "</h1></section>";
			i++;
		});
		t += "<section index=" + i +" data-autoslide=3000 version=" + version + ">It is over</section>";
		$( ".slides" ).append( t );
	}

	//update the user_answers array based on his answers (1 - press button)
	// (0 - do nothing)
	this.update_answers = function(slide_index){
		if ((slide_index > 0) && (slide_index <= this.length)){
			this.user_answers[slide_index-1] = 1;
		}
	}

	//compare the user_answers with the true_ansers and return the number of 
	//element equals
	this.count_answers	= function (){
		var score = 0;
		for (var i = 0, len = this.length; i < len; i++){
				if (this.true_answers[i] === this.user_answers[i]){score++}
			}
		return score
	}

	this.display_score = function (){
		count = this.count_answers() / this.length;
		return count*100;
	}
}