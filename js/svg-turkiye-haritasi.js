function getCityValue(jsondata, cname){
    for(var i = 0; i < jsondata.values.length; i++){
      if(jsondata.values[i].city.toLowerCase() === cname.toLowerCase()){
        return jsondata.values[i].value;
      }
    }

    return 0;
}

function svgturkiyeharitasi() {
  const element = document.querySelector('#svg-turkiye-haritasi');
  const info = document.querySelector('.il-isimleri');
  const json = { values : [
    { city:"edirne", value:"20" },
    { city:"antalya", value:"10" },
    { city:"ankara", value:"5" },
    { city:"manisa", value:"3" },
  ]};

  var pathes = element.querySelectorAll('path');
  
  for (var i = 0; i < pathes.length; i++) {
    var cityg = pathes[i].parentNode;
    var cityName = cityg.getAttribute('data-iladi');
    
    var dv = document.createElement("div");
    dv.className = "il-isimleri";
    
    var val = getCityValue(json, cityName);
    dv.innerHTML = "<div>" + cityName + " (" + val + ")" + "</div>";
    
    var rect = cityg.getBoundingClientRect();
    var x = rect.left;
    var y = rect.top;

    dv.style.left = (x + parseInt(rect.width/3)) + "px";
    dv.style.top = (y + parseInt(rect.height/3)) + "px";

    document.body.appendChild(dv);
  }

  // element.addEventListener(
  //   'mouseover',
  //   function (event) {
  //     if (event.target.tagName === 'path' && event.target.parentNode.id !== 'guney-kibris') {
  //       info.innerHTML = [
  //         '<div>',
  //         event.target.parentNode.getAttribute('data-iladi'),
  //         '</div>'
  //       ].join('');
  //     }
  //   }
  // );

  // element.addEventListener(
  //   'mousemove',
  //   function (event) {
  //     info.style.top = event.pageY + 25 + 'px';
  //     info.style.left = event.pageX + 'px';
  //   }
  // );

  // element.addEventListener(
  //   'mouseout',
  //   function (event) {
  //     info.innerHTML = '';
  //   }
  // );

  element.addEventListener(
    'click',
    function (event) {
      if (event.target.tagName === 'path') {
        const parent = event.target.parentNode;
        const id = parent.getAttribute('id');

        if (id === 'guney-kibris') return;

        window.location.href = (
          '#' + id + '-' + parent.getAttribute('data-plakakodu')
        );

        console.log('#' + id + '-' + parent.getAttribute('data-plakakodu'));
      }
    }
  );
}
