AFRAME.registerComponent("marker-handler",{
    init:async function(){
        var Toys=await this.getToys()
        this.el.addEventListener("markerFound",()=>{
            console.log("markerFound")
            var marker_id
            Toys.map(Toys=>{marker_id=Toys.id})
            console.log(marker_id)
            this.handleMarkerFound(Toys,marker_id)
        })
        this.el.addEventListener("markerLost",()=>{
            console.log("markerLost")
            this.handleMarkerLost()
        })
    },
    handleMarkerFound: function(Toys,marker_id){

        var buttonDiv=document.getElementById("button-div")
        buttonDiv.style.display="flex"
        var ratingButton=document.getElementById("rating-button")
        var orderButton=document.getElementById("order-button")
        ratingButton.addEventListener("click",function(){
            swal({
                icon:"warning",
                title:"Rate this toy",
                text: "work in progress"
            })
        })
        orderButton.addEventListener("click",function(){
            swal({
                icon:"https://imgur.com/4NZ6uLY",
                title:"THANK YOU FOR ORDERING",
                text: " you will recieve your toy soon"
            })
        })
        var Toys=Toys.filter(toy=>toy.id===marker_id)[0]
        var model=document.querySelector(`#model-${Toys.id}`)
        model.setAttribute("position",Toys.model_geometry.position)
        model.setAttribute("rotation",Toys.model_geometry.rotation)
        model.setAttribute("scale",Toys.model_geometry.scale)
    },
    handleMarkerLost: function(){
        var buttonDiv=document.getElementById("button-div")
        buttonDiv.style.display="none"
    },
    getDishes:async function(){
        return await firebase.firestore()
        .collection("Toys").get().then(snap=>{return snap.docs.map(doc=>doc.data())})
    }
})