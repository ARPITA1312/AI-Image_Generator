import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.svg'

const ImageGenerator = () => {
    const [image_url,setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading,setLoading] = useState(false);

    const imageGenerator = async () =>{
        if(inputRef.current.value===""){
            return 0;
        }
        setLoading(true);
        const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:
                "Bearer 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",
                "User-Agent": "Chrome",

            },
            body:JSON.stringify({
                prompt: `${inputRef.current.value}`,
                n:1,
                size:"512*512",
            }),
        }
    );
    let data = await response.json();
    let data_array = data.data;
    setImage_url(data_array.url);
    setLoading(false);
    }
  return (
    <div className='ai-image-generator'>
        <div className="header">Ai image <span>generator</span></div>
        <div className="img-loading">
            <div className="image"><img src={image_url==="/"?default_image:image_url} alt="" /></div>
            <div className="loading">
                <div className={loading?"loading-bar-full":"loading-bar"}></div>
                    <div className={loading?"loading-text":"display-non"}>Loading...</div>
                
            </div>
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want To See?' />
            <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
        </div>
    </div>
  )
}
export default ImageGenerator