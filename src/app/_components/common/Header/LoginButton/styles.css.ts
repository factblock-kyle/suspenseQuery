import { style } from "@vanilla-extract/css";

export const container = style({
    display: 'flex',
    gap: '40px',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderBottom: '1px solid #ccc',
    backgroundColor: '#f8f8f8',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 100,
    position: 'sticky',
    top: 0,
    backdropFilter: 'blur(10px)',
});