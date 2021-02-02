import * as React from 'react';
import { useState } from 'react';
import "./UploadImageComponent.scss";
import img from "../../../assets/img/ant-logo.svg"
interface UploadImageComponentProps {
    imgUrl: string;
    disabled: boolean;
    onChange: (img: string) => void
}

export function UploadImageComponent({ imgUrl: imageUrl, disabled, onChange }: UploadImageComponentProps) {
    const [stateImg, setStateImg] = useState<string>(imageUrl);
    const [stateShowImg, setShowImg] = useState<boolean>(imageUrl.length ? true : false);
    const [stateImgError, setImgError] = useState<boolean>(false);

    const setImgValue = (s: string) => {
        setStateImg(s)
        setImgError(false);

        if (!stateImgError && stateImg) {
            setStateImg(s)
            handleUploadImg()
            if (s.length > 15) {
                setShowImg(true);
            }
        }
    }

    const imgErrorHandler = () => {
        setStateImg("");
        setImgError(true);
        setShowImg(false);
    }

    const handleUploadImg = (): void => {
        onChange(stateImg)
    }

    return (
        <div className="upload-container">
            {stateShowImg ? <img src={imageUrl} onError={() => imgErrorHandler()} alt="avatar" />
                : !disabled ? <textarea value={stateImg} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setImgValue(event.target.value)} ></textarea> : <img src={img} alt="avatar" />}
            <div onClick={imgErrorHandler}></div>
        </div>
    )
}