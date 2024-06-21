'use client'

import { useToast } from "@/components/ui/use-toast"
import { dataUrl, getImageSize } from "@/lib/utils";
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type MediaUploaderProps = {
    onValueChange: (value: string) => void;
    setImage: React.Dispatch<any>;
    publicId: string;
    image: any;
    type: string;
}

const MediaUploader = ({ onValueChange, setImage, image, publicId, type }: MediaUploaderProps) => {
    const { toast } = useToast();


    const onUploadSuccessHandler = (result: any) => {
        setImage((prevState: any) => ({
            ...prevState,
            publicId: result?.info?.public_id,
            width: result?.info?.width,
            height: result?.info?.height,
            secureURL: result?.info?.secure_url
        }) )

        onValueChange(result?.info?.public_id)

        toast({
            title: 'image uploaded successfully',
            description: '1 credit deducted from your account',
            duration: 5000,
            className: 'success-toast'
        })
    }

    const onUploadErrorHandler = () => {
        toast({
            title: 'something went wrong while uploading',
            description: 'please try again',
            duration: 5000,
            className: 'error-toast'

        })
    }

    return (
        <CldUploadWidget
            uploadPreset="pk_iMagnify"
            options={{
                multiple: false,
                resourceType: "image"
            }}
            onSuccess={onUploadSuccessHandler}
            onError={onUploadErrorHandler}
        >
            {({ open }) => (
                <div className="flex flex-col gap-4">
                    <h3 className="h3-bold text-dark-600">Original</h3>

                    {publicId ? (
                        <>
                            <div>
                                <CldImage 
                                width={getImageSize(type, image, "width")}
                                height={getImageSize(type, image, "height")}
                                src={publicId}
                                alt="image"
                                sizes={"(max-width: 767px) 100vw, 50vw"}
                                placeholder={dataUrl as PlaceholderValue}
                                className="media-uploader_cldImage"
                                />

                            </div>
                        </>
                    ) : (
                        <div className="media-uploader_cta" onClick={() => open()}>
                            <div className="media-uploader_cta-image">
                                <Image
                                    src="/assets/icons/add.svg"
                                    width={24} height={24}
                                    alt="add"
                                />
                                
                            </div>
                            <p className="p-14-medium">Click here to upload image</p>
                        </div>
                    )}
                </div>
            )}
        </CldUploadWidget>
    )
}

export default MediaUploader