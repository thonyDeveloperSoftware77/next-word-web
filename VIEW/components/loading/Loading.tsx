import { CircularProgress } from "@nextui-org/react";

export default function Loading() {
   

    return (
        <div style={{
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
            zIndex: 9999,
            left: 0,
            top: 0,
        }}>
             <CircularProgress label="Loading..." />
        </div>
    );
}