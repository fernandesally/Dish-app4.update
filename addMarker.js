AFRAME.registerComponent("create-marker",{
    init:async function(){
      
      var Toys=await this.getToys()
      Toys.map(Toys=>{
        console.log(Toys)
        var mainscene=document.querySelector("#main-scene")
          var marker=document.createElement("a-marker")
          marker.setAttribute("id",Toys.id)
          marker.setAttribute("type","pattern")
          marker.setAttribute("url",Toys.marker_pattern_url)
          //marker.setAttribute("cursor",{rayOrigin:"mouse"})
         // marker.setAttribute("marker-handler",{})
          mainscene.appendChild(marker)
          var model=document.createElement("a-entity")
          model.setAttribute("id", Toys.id)
          model.setAttribute("position",Toys.model_geometry.position)
          model.setAttribute("rotation", Toys.model_geometry.rotation)
          model.setAttribute("scale",Toys.model_geometry.scale)
          model.setAttribute("gltf-model",Toys.model_url)
          model.setAttribute("gesture-handler",{})
          marker.appendChild (model)
          var camera=document.createElement("a-entity")
          camera.setAttribute("camera",{})
          marker.appendChild(camera)
          var titlePlane= document.createElement("a-plane")
          titlePlane.setAttribute("position",{x:2.9, y:-4, z:-10})
          titlePlane.setAttribute("rotation",{x:0, y:0,z:0})
          titlePlane.setAttribute("width",3)
          titlePlane.setAttribute("height",5)
          titlePlane.setAttribute("gesture-handler",{})
          titlePlane.setAttribute("text",{
            value:Toys.Toys_name.toUpperCase(),
            color:"black",
            font:"monoid",
            position:"fixed"
  
          })
          mainscene.appendChild(titlePlane)
          var discription=document.createElement("a-plane")
          discription.setAttribute("position",{x:2.4, y:0, z:-5})
          discription.setAttribute("rotation",{x:0, y:0, z:0})
          discription.setAttribute("width",2)
          discription.setAttribute("height",4)
          discription.setAttribute("material","color","pink")
          discription.setAttribute("gesture-handler",{})
          discription.setAttribute("text",{
            value:Toys.discription.join("\n\n"),
            color:"black",
            font:"monoid",
            position:"fixed"
          })
          mainscene.appendChild(discription)
        var pricePlane=document.createElement("a-image")
        pricePlane.setAttribute("id",dish.id)
        pricePlane.setAttribute("src","https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/black-circle.png")
        pricePlane.setAttribute("width",0.8)
        pricePlane.setAttribute("height",0.8)
        pricePlane.setAttribute("rotation",{x:0, y:0, z:0 })
        pricePlane.setAttribute("position",{x:-2, y:0.5, z:-6})
        pricePlane.setAttribute("visible",true)
        var price=document.createElement("a-entity")
        price.setAttribute("id",Toys.id)
        price.setAttribute("position",{x:0, y:0.5, z:-3})
        price.setAttribute("rotation",{x:0, y:0, z:0})
        price.setAttribute("text", {
          font:"mozillavr",
          color:"white",
          width:4,
         // align:"center",
          value:`only\n $${Toys.price}`

        })
pricePlane.appendChild(price)
marker.appendChild(pricePlane)
var ratingPlane = document.createElement("a-entity");
        ratingPlane.setAttribute("id", `rating-plane-${Toys.id}`);
        ratingPlane.setAttribute("position", { x: 2, y: 0, z: 0.5 });
        ratingPlane.setAttribute("geometry", {
          primitive: "plane",
          width: 1.5,
          height: 0.3
        });

        ratingPlane.setAttribute("material", {
          color: "#F0C30F"
        });
        ratingPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        ratingPlane.setAttribute("visible", false)
        var rating = document.createElement("a-entity");
        rating.setAttribute("id", `rating-${Toys.id}`);
        rating.setAttribute("position", { x: 0, y: 0.05, z: 0.1 });
        rating.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        rating.setAttribute("text", {
          font: "mozillavr",
          color: "black",
          width: 2.4,
          align: "center",
          value: `Customer Rating: ${Toys.last_rating}`
        });

        ratingPlane.appendChild(rating);
        marker.appendChild(ratingPlane);

        })
        },
          getToys: async function(){
            return firebase.firestore().collection("Toys").get().then(snap=>{return snap.docs.map(doc=>doc.data())})
        } 
        })