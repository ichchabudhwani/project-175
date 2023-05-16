AFRAME.registerComponent("city", {
    init: async function () {
  
      //Get the compund details of the element
      var model = await this.getModel();
  
      var barcodes = Object.keys(model);
  
      barcodes.map(barcode => {
        model[barcode];
  
        //Call the function
        this.createCity(model);
      });
  
    },
    getModel: async function () {
      const res = await fetch("modelList.json");
        const data = await res.json();
        return data;
    },
  
    createCity:  function (model) {
  
      //Element data
      var modelName = model.model_name;
      var barcodeValue = model.barcode_value;
      var modelUrl=model.model_url
  
      //Get the color of the element
     
  
      //Scene
      var scene = document.querySelector("a-scene");
  
      //Add marker entity for BARCODE marker
      var marker = document.createElement("a-marker");
  
      marker.setAttribute("id", `marker-${modelName}`);
      marker.setAttribute("type", "barcode");
      marker.setAttribute("model_name", modelName);
      marker.setAttribute("value", barcodeValue);
  
      scene.appendChild(marker);
      marker.setAttribute("id", `marker-${barcodeValue}`);
      marker.setAttribute("type", "barcode");
      marker.setAttribute("model_name", modelName);
      marker.setAttribute("value", barcodeValue);
  
      scene.appendChild(marker);
  
      var city = document.createElement("a-entity");
      city.setAttribute("id", `${modelName}-${barcodeValue}`);
      marker.appendChild(city);
  
      //Create atom card
      var card = document.createElement("a-entity");
    card.setAttribute("id", `card-${modelName}`);
    card.setAttribute("geometry", {
      primitive: "plane",
      width: 1,
      height: 1
    });

    card.setAttribute("material", {
      src: `./${modelName}.png`
    });

    card.setAttribute("position", { x: 0, y: 0, z: 0 });
    card.setAttribute("rotation", { x: -90, y: 0, z: 0 });

    city.appendChild(card);

  
     if (barcodeValue===0) {
      var modelEl=document.createElement("a-entity")  
      modelEl.setAttribute("id",`${modelName}`)
      modelEl.setAttribute("geometry",{
        primitive:"box",
        height:model.height,
        width:model.width
      }),
      modelEl.setAttribute("position",model.position)
      modelEl.setAttribute("rotation",model.rotation)
      modelEl.setAttribute("material",{
        color:model.color
      }
      ),
      marker.appendChild(modelEl)
     }else{
        var modelEl=document.createElement("a-entity")  
      modelEl.setAttribute("id",`${modelName}`)
      modelEl.setAttribute("gltf-model",`url(${modelUrl})`)
      modelEl.setAttribute("scale",model.scale)
      modelEl.setAttribute("position",model.position)
      modelEl.setAttribute("rotation",model.rotation)
      marker.appendChild(modelEl)
     }
    }
})
    
  
      
    
