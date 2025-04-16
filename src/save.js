import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    
    const blockProps = useBlockProps.save({
        className: `section-${attributes.blockId} inline-block`,
        style: {
            width: attributes.Image.imgUrl ? `${attributes.Image.width}px` : 'auto',
            maxWidth: '100%'
        }
    });
    
    return (
        <div {...blockProps}>
            {attributes.Image?.imgUrl && (
                <div className={attributes.EnableLightbox ? 'img-lb-custom-popup-container' : ''} id={attributes.EnableLightbox ? `popup-${attributes.blockId}` : ''}>
                    {attributes.EnableLightbox ? (
                        <>
                            <img 
                                src={attributes.Image.imgUrl} 
                                className="img-lb-popup-trigger img-lb-img-tag img-lb-cursor-zoom-in"
                                style={{
                                    width: `${attributes.Image.width}px`,
                                    height: `${attributes.Image.height}px`,
                                    display: 'block'
                                }}
                                alt={attributes.Image.altText}
                                data-popup={`popup-${attributes.blockId}`}
                            />
                            <div className="img-lb-popup-overlay">
                                <div className="img-lb-popup-content">
                                    <span className="img-lb-popup-close">&times;</span>
                                    <img 
                                        src={attributes.Image.imgUrl} 
                                        alt={attributes.Image.altText}
                                        className="img-lb-popup-image"
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <img 
                            src={attributes.Image.imgUrl} 
                            className="img-lb-img-tag"
                            style={{
                                width: `${attributes.Image.width}px`,
                                height: `${attributes.Image.height}px`,
                                display: 'block'
                            }}
                            alt={attributes.Image.altText} 
                        />
                    )}
                </div>
            )}
        </div>
    );
}