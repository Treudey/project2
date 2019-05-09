const GETRoute = '/api/all';
let map;

const data = [
    {
        id: 1, 
        nameOfPlace: 'Kinton Ramen', 
        coords: [43.68, -79.43],
        address: '90 Eglinton Ave. East, Unit 108',
        overallRating: 7, 
        comment: 'The soap seemed to be very watered down. Bonus points for the complimentary mouth wash and tooth picks. Would definitely poop again.'
    },
    {
        id: 2, 
        nameOfPlace: 'Han Ba Tang', 
        coords: [43.68, -79.4],
        address: '4862 Yonge Street',
        overallRating: 7, 
        comment: 'I found it very weird that the inside of the stalls did not match the same rustic wood panelling as the rest of the bathroom.'
    },
    {
        id: 3, 
        nameOfPlace: 'Pancho y Emiliano', 
        coords: [43.67, -79.43],
        address: '291 King Street West',
        overallRating: 7, 
        comment: 'Absolutely spotless, apart from single piece of toilet paper next to the toilet. Loved the subway tiles and the vintage hand dryer. Bonus points for having both paper towel and hand dryer. Would definitely poop again.'
    },
    {
        id: 4, 
        nameOfPlace: 'ZED 80', 
        coords: [43.7, -79.43],
        address: '185 Danforth Avenue',
        overallRating: 7, 
        comment: 'There was a bag of clothes next to the toilet the entire night. Bonus points for having both paper towel and hand dryer. Bonus, bonus points for Garbage Pail Kids!'
    },
    {
        id: 5, 
        nameOfPlace: 'Air Canada Centre', 
        coords: [43.68, -79.45],
        address: '40 Bay Street',
        overallRating: 6, 
        comment: 'Though loss for the Raptors tonight. The smell of urine and overpriced beer permeated the air. Vanity covered in water. Urinals, urinals everywhere.'
    }
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12.15,
        center: new google.maps.LatLng(43.68, -79.43),
        mapTypeId: 'terrain'
    });

    // Loop through the results array and place a marker for each
    // set of coordinates.
    // $.get(GETRoute, (data) => {

        for (let i = 0; i < data.length; i++) {
            const location = data[i];

            const geocoder = new google.maps.Geocoder();

            geocoder.geocode({address: location.address + ', Toronto, Canada'}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    const coords = results[0].geometry.location;
                            
                    const contentString = '<div id="content">'+
                    '<div id="siteNotice">'+
                    '</div>'+
                    '<h1 id="firstHeading" class="firstHeading">' + location.nameOfPlace + '</h1>'+
                    '<div id="bodyContent">'+
                    '<p><b>Address:</b> ' + location.address + '</p>' +
                    '<p><b>Overall Rating:</b> ' + location.overallRating + '/10</p>' +
                    '<p><b>Review:</b> ' + location.comment + '</p>'+
                    '</div>'+
                    '</div>';
            
                    const infowindow = new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 400
                    });

                    const marker = new google.maps.Marker({
                        position: coords,
                        map: map
                    });
                
                    marker.addListener('click', () => {
                        infowindow.open(map, marker);
                    });

                }  else { // if status value is not equal to "google.maps.GeocoderStatus.OK"

                    // warning message
                    alert("The Geocode was not successful for the following reason: " + status);
                }
            });
        }
    //});
}
/*
window.eqfeed_callback = function(results) {
    for (var i = 0; i < results.features.length; i++) {
        var coords = results.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1],coords[0]);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
    }
};
*/
