          function makeOKButton(xCord, yCord, eventListener) {
              var container = new createjs.Container();
              container.x = xCord;
              container.y = yCord;
              
              var rect = new createjs.Shape();
              rect.graphics.beginFill("#096d02").drawRect(0, 0, 65, 45)

              text = new createjs.Text("OK", "36px Arial", "#FFFFFF");
              text.x = 6;
              text.y = 3;
              
              container.addChild(rect)
              container.addChild(text)
              container.addEventListener("click", eventListener);
              return container;
          }
