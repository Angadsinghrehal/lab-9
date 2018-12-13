const money = [
  { level: '1', amount: '100' },
  { level: '2', amount: '200' },
  { level: '3', amount: '300' },
  { level: '4', amount: '500' },
  { level: '5', amount: '1,000' },
  { level: '6', amount: '2,000' },
  { level: '7', amount: '4,000' },
  { level: '8', amount: '8,000' },
  { level: '9', amount: '16,000' },
  { level: '10', amount: '25,000' },
  { level: '11', amount: '50,000' },
  { level: '12', amount: '100,000' },
  { level: '13', amount: '250,000' },
  { level: '14', amount: '500,000' },
  { level: '15', amount: '1,000,000' }
];

const musicRound1=new Audio('soundsmusic(1)/Round1.ogg')

 const app=new Vue({
  el: '#layout',
	 mounted(){
		 this.GetQuestions();
   
		 
		 window.addEventListener('keydown', this.Button);
	 },
  data: {
	  questions:[],
	  index:0,
	  shuffleArray:[],
	  items:money
  },
	 watch:{
		index(){
		 this.shuffle();
			console.log(this.singh().correct_answer)
		} 
	 },
	 methods:{
		 PlaytheGame(e){
			musicRound1.play(); 
		 },
		 
		 Button(e){
			const key= document.querySelector(`button[data-key="${e.keyCode}"]`);
			 
			 if(!key) return;
			 key.click();
			 
		 },
		asr(e){
			 ({ index}=e.target.dataset);
			
		  const SelectedAns =this.shuffleArray[index];
		 
		  if (SelectedAns === this.singh().correct_answer){
			this.index +=1;
			 
		  }
			else{
				console.log("Wrong")
			}
		 },
		 singh(){
			 return this.questions[this.index];
		 },
		 answers(idx){
			 return this.shuffleArray[idx];
		 },
		 shuffle(){
		 const asr=[ this.singh().correct_answer,
						 ...this.singh().incorrect_answers
						
								];
			 
			 this.shuffleArray =_.shuffle(asr);
		 },
             GetQuestions: async function(){
		 const response = await fetch('https://opentdb.com/api.php?amount=20&category=21&type=multiple');
			 const data = await response.json();
			 this.questions= data.results; 
			 		 this.shuffle(); 
			 console.log(this.singh().correct_answer);
	 },
             speak() {
      const host = new SpeechSynthesisUtterance();
      host.lang = "en-US";
      host.text = this.questions[this.index].question;
      speechSynthesis.speak(host);
    }
	 }
});



