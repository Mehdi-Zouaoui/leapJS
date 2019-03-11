const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
const outputEl = document.getElementsByTagName('output')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const controller = new Leap.Controller({enableGestures: true});
controller.connect();

controller.on('frame', (frame) => {
  
	// Efface le canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// Pour chaque main
	frame.hands.forEach( hand => {
		
		// Dessin de la paume
		var palmPos = getCoords(hand.palmPosition, frame, canvas);
		ctx.fillRect(palmPos.x, palmPos.y, 25, 25);
		
		// Parcours de chaque doigt
		hand.fingers.forEach( finger => {
			 var carpPos = getCoords(finger.carpPosition, frame, canvas); // carpal
             ctx.fillRect(carpPos.x, carpPos.y, 10, 10);
             ctx.fillStyle = "blue";
			 
			 var mcpPos = getCoords(finger.mcpPosition, frame, canvas); // metacarpal
             ctx.fillRect(mcpPos.x, mcpPos.y, 10, 10);
             ctx.fillStyle = "pink";
			 
			 var pipPos = getCoords(finger.pipPosition, frame, canvas); // proximal
			 ctx.fillRect(pipPos.x, pipPos.y, 10, 10);
			 ctx.fillStyle = "green";
			 var dipPos = getCoords(finger.dipPosition, frame, canvas); // intermediate phalange
             ctx.fillRect(dipPos.x, dipPos.y, 10, 10);
             ctx.fillStyle = "yellow";
			 
			 var tipPos = getCoords(finger.tipPosition, frame, canvas); // distal phalange
             ctx.fillRect(tipPos.x, tipPos.y, 20, 20);
             ctx.fillStyle = "red";

             frame.gestures.forEach(gesture => {
                switch (gesture.type) {
                    case 'circle' :
                         ctx.beginPath();
                         ctx.arc(tipPos.x, tipPos.y,10, 0, 2 * Math.PI);
                         ctx.fill();
                         ctx.fillStyle = 'white';
                              break;
        
                    case 'keyTap' :
                             
                              break;
        
                    case 'screenTap' :
                            
                              break;
        
                    case 'swipe' :
                              
                              break;
                      }
        
                  });

                  
		 });
		
	});
	
});

function getCoords(leapPoint, frame, canvas) {
    const iBox = frame.interactionBox;
    const normalizedPoint = iBox.normalizePoint(leapPoint, true);

    return {
        x : normalizedPoint[0] * canvas.width,
        y : (1 - normalizedPoint[1]) * canvas.height
    };
}