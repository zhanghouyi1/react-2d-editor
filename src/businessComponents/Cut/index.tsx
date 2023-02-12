import React, { useRef } from 'react';
import Cropper from 'react-cropper';

import './index.less';
interface CutProps {
    imgURL: string;
    onSaveHandler: Function;
}

export const Cut: React.FC<CutProps> = ({ imgURL, onSaveHandler }): React.ReactElement<any, any> => {
    const cropperRef = useRef<any>(null);
    const saveImage = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        onSaveHandler(cropper.getCroppedCanvas().toDataURL());
    };

    return (
        <div className="cutContaint" style={{ height: '100%', width: '100%' }}>
            <Cropper
                src={imgURL}
                style={{ height: '100%', width: '100%' }}
                initialAspectRatio={16 / 9}
                guides={false}
                ref={cropperRef}
                viewMode={1}
                // guides={true}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                // background={false}
                responsive={true}
                autoCropArea={1}
                // aspectRatio={4 / 3}
                checkOrientation={false}
            />
            <div className="saveImg">
                <div onClick={saveImage} className="">
                    确定
                </div>
            </div>
        </div>
    );
};
