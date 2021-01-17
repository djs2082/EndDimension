// import React, { Component } from 'react';
// import ReactFullscreenSlideshow from 'react-fullscreen-slideshow';
import axios from 'axios';
// import img1 from '../images/background.jpg'
// import img2 from '../images/background2.jpg'
// import img3 from '../images/background3.jpg'


 
// const images = [
//     {
//         image: img1,
//         caption: 'Caption for image_1',
//         description: 'Description for image_1'
//     },
//     {
//         image: img2,
//         caption: 'Caption for image_2',
//         description: 'Very big description for image_2'
//     },
//     {
//         image: "http://127.0.0.1:8000/media/prac_12.png",
//         caption: 'Caption for image_2',
//         description: 'Very big description for image_2'
//     }
// ];
 
// class Image extends Component {
//     constructor(props) {
//         super(props);    
//         if (!(this.loggedIn = sessionStorage.getItem('IsLoggedIn') === 'true')){
//           this.props.history.push('/')
//         }
//         this.state = {
//             images:[],
//           errors: []
//         }
    
//       }
//       componentWillMount=()=>{
//         const headers = {
//             'Authorization': 'Token ' + sessionStorage.getItem('Token')
//           }
//           var apiEndPoint=window.API_URL+'/api/scans/'+sessionStorage.getItem('patientId')
//           axios.get(apiEndPoint, {
//             headers: headers
//           })
//             .then(response => {
//               console.log(images)
//               response.data.Data.forEach(element=>{
//                 //   console.log(element)
//                   var image_name="http://127.0.0.1:8000"+element.scan
//                   var caption=element.name
//                   images.push({image:image_name,caption:caption,description:"blab"})
//               })
//             })
//             .catch(error => {
//               this.errorOccured(500, "error occurred", error.toString())
//             });
//       }
//   render() {
//     return (
//         <div className="App"> 
//             <ReactFullscreenSlideshow images={images} title={"Example Image slideshow"}/>
//         </div>
//     );
//   }
// }
// export default Image;


import ImageGallery from 'react-image-gallery';
import React, { Component } from 'react'
 
class Image extends React.Component {
    state={
        images:[],
        description:""
    }
    componentWillMount=()=>{
                const headers = {
                    'Authorization': 'Token ' + sessionStorage.getItem('Token')
                  }
                  var apiEndPoint=window.API_URL+'/api/scans/'+sessionStorage.getItem('patientId')
                  console.log(apiEndPoint)
                  axios.get(apiEndPoint, {
                    headers: headers
                  })
                    .then(response => {
                      response.data.Data.forEach(element=>{
                          var image_name="http://127.0.0.1:8000"+element.scan
                          var caption=element.name
                          this.state.images.push({original:image_name,thumbnail:image_name,thumbnailLabel:element.name,description:element.description,originalTitle:element.name})
                      })
                    })
                    .catch(error => {
                      // this.errorOccured(500, "error occurred", error.toString())
                    });
              }
  render() {
    return <ImageGallery items={this.state.images} />;
  }
}

export default Image