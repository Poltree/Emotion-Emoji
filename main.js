prediction_1 = ""
prediction_2 = ""
Webcam.set({
    width:300,
    height:330,
    image_format:"png",
    png_quality:99
});
camera = document.getElementById("camera")
Webcam.attach("#camera")

function capture_image(){
    Webcam.snap(function(data_uri){
        document.getElementById("snapshot").innerHTML = '<img id="snap_img" src="'+data_uri+'"/>';
    
    });
}


console.log("ml5 version is "+ ml5.version)

model = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/FtDYsEwqt/model.json", modelloaded);
function modelloaded(){
    console.log("model loaded")
}
function speech(){
    spk = window.speechSynthesis;
    speak_data_1 = "the First Prediction is " + prediction_1;
    speak_data_2 = " and the Second Prediction is " + prediction_2;
    utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    spk.speak(utterThis);
}

function identify(){
    picture = document.getElementById("snap_img");
    model.classify(picture,gotResult)
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results)
        document.getElementById("emotion1").innerHTML = results[0].label;
        document.getElementById("emotion2").innerHTML = results[1].label;

        if(results[0].label === "Happy"){
            document.getElementById("emoji1").innerHTML = "&#128515";
        }
        if(results[0].label === "Angry"){
            document.getElementById("emoji1").innerHTML = "&#128545";
        }
        if(results[0].label === "Sad"){
            document.getElementById("emoji1").innerHTML = "&#128532";
        }
        if(results[1].label === "Happy"){
            document.getElementById("emoji2").innerHTML = "&#128515";
        }
        if(results[1].label === "Angry"){
            document.getElementById("emoji2").innerHTML = "&#128545";
        }
        if(results[1].label === "Sad"){
            document.getElementById("emoji2").innerHTML = "&#128532";
        }
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speech();
    }

}