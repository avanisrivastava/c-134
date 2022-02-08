img="";
status="";
objects=[];

function preload(){
//img=loadImage("dog_cat.jpg");
}

function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.hide();
objectDetector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="status:detecting objects";
}

function modelLoaded(){
    console.log("modelLoaded");
    status=true;
    
}

function gotResults(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    objects=results;
}
}

function draw(){
image(video,0,0,380,380);
//something
//fill("#F31986");
//text("dog",45,75);
//noFill();
//stroke("#F31986");
//rect(30,75,400,350);

//text("cat",300,100);
//rect(300,110,300,300);


if(status!=""){
    objectDetector.detect(video,gotResults);
    r=random(255);
    g=random(255);
    b=random(255);
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="status: object detected";
        document.getElementById("no_of_objects").innerHTML="number of object detected are: "+ objects.length;
        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}