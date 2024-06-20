import { useToast } from "@/components/ui/use-toast"
import { CldUploadWidget } from 'next-cloudinary';
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
                            Here is the Image
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