export default function AlertError({ error }: any) {
    logger.log(error)
    
    return (
        <div className="alert alert-danger border-2 d-flex align-items-center justify-content-between py-1"
            role="alert">
            <div className="bg-danger me-2 icon-item icon-item-sm">
                <span className="fas fa-times-circle text-white" />
            </div>
            <ul className={'m-0 p-0'}>
                {
                    Array.isArray(error) ? error.map((err: any) => {
                        return <li className={'small'} key={err.message}>{err.message}</li>;
                    }) : <li className={'small'} >{error.message || error.error}</li>
                }
            </ul>
            <button className="btn-close small" type="button" data-bs-dismiss="alert" aria-label="Close" />
        </div>
    )
}
