/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { __ } from "@wordpress/i18n";
import {
    useBlockProps,
    InspectorControls,
    MediaUpload,
} from "@wordpress/block-editor";
import { Panel, PanelRow, PanelBody, Button, CheckboxControl } from "@wordpress/components";

import "./editor.scss";

export default function Edit({ attributes, setAttributes, clientId }) {
    setAttributes({ blockId: clientId });
 
    // Function to handle image selection and maintain aspect ratio
    const handleImageSelect = (media) => {
        const { url, title, width: originalWidth, height: originalHeight } = media;
        
        // Calculate aspect ratio
        const aspectRatio = originalWidth / originalHeight;
        
        // Set initial dimensions based on original size or default values
        let width = originalWidth || 1400;
        let height = originalHeight || Math.round(width / aspectRatio);
        
        // If width is too large, scale it down while maintaining aspect ratio
        if (width > 1400) {
            width = 1400;
            height = Math.round(width / aspectRatio);
        }
        
        setAttributes({ 
            Image: { 
                imgUrl: url,
                altText: title,
                width,
                height,
                aspectRatio
            } 
        });
    };

    // Function to handle dimension changes while maintaining aspect ratio
    const handleDimensionChange = (dimension, value) => {
        const aspectRatio = attributes.Image.aspectRatio || 1;
        const newValue = parseInt(value);

        if (dimension === 'width') {
            setAttributes({
                Image: {
                    ...attributes.Image,
                    width: newValue,
                    height: Math.round(newValue / aspectRatio)
                }
            });
        } else {
            setAttributes({
                Image: {
                    ...attributes.Image,
                    height: newValue,
                    width: Math.round(newValue * aspectRatio)
                }
            });
        }
    };

    // Calculate blockProps with dynamic width
    const blockProps = useBlockProps({
        className: "relative inline-block", // Add inline-block to allow side-by-side placement
        style: {
            width: attributes.Image.imgUrl ? `${attributes.Image.width}px` : 'auto',
            maxWidth: '100%'
        }
    });

    return (
        <>
            <InspectorControls>
                <Panel header={__("Setting", "pxd")}>
                    <React.Fragment key=".0">
                        <PanelBody
                            className="pxd-head"
                            title={__("General", "pxd")}
                        >
                            <PanelRow>
                                <CheckboxControl
                                    label={__("Enable Lightbox", "pxd")}
                                    checked={attributes.EnableLightbox}
                                    onChange={(value) => setAttributes({ EnableLightbox: value })}
                                />
                            </PanelRow>
                            <PanelRow>
                                <div className="components-base-control">
                                    <label className="components-base-control__label">Image Width (px)</label>
                                    <input
                                        type="number"
                                        value={attributes.Image.width || 1400}
                                        onChange={(e) => handleDimensionChange('width', e.target.value)}
                                        min="1"
                                    />
                                </div>
                            </PanelRow>
                            <PanelRow>
                                <div className="components-base-control">
                                    <label className="components-base-control__label">Image Height (px)</label>
                                    <input
                                        type="number"
                                        value={attributes.Image.height || 638}
                                        onChange={(e) => handleDimensionChange('height', e.target.value)}
                                        min="1"
                                    />
                                </div>
                            </PanelRow>
                        </PanelBody>
                    </React.Fragment>
                </Panel>
            </InspectorControls>
            <div {...blockProps}>
                {!attributes.Image.imgUrl && (
                    <div 
                        className="upload-prompt"
                        style={{
                            width: '300px',
                            height: '200px',
                            border: '2px dashed #ccc',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: '#f7f7f7'
                        }}
                    >
                        <MediaUpload
                            onSelect={handleImageSelect}
                            allowedTypes="image"
                            render={({ open }) => (
                                <Button 
                                    isPressed 
                                    onClick={open} 
                                    variant="primary"
                                >
                                    {__('Add/Update Image', 'pxd')}
                                </Button>
                            )}
                        />
                    </div>
                )}
                {attributes.Image.imgUrl && (
                    <>
                        <MediaUpload
                            onSelect={handleImageSelect}
                            allowedTypes="image"
                            render={({ open }) => (
                                <Button 
                                    onClick={() => setAttributes({ Image: { imgUrl: '', altText: '' } })} 
                                    variant="primary" 
                                    className="remove-button"
                                    style={{
                                        position: 'absolute',
                                        background: 'red',
                                        top: '10px',
                                        left: '10px',
                                        zIndex: 1
                                    }}
                                >
                                    {__('Remove Image', 'pxd')}
                                </Button>
                            )}
                        />
                        <img
                            src={attributes.Image.imgUrl}
                            className="img-lb-img-tag richtext-border"
                            style={{
                                width: `${attributes.Image.width}px`,
                                height: `${attributes.Image.height}px`,
                                display: 'block'
                            }}
                            alt={attributes.Image.altText || __('Image', 'pxd')}
                        />
                    </>
                )}
            </div>
        </>
    );
}