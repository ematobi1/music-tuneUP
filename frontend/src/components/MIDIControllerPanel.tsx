import React, { useEffect, useState } from 'react';

const MIDIControllerPanel: React.FC = () => {
    const [midiSupported, setMidiSupported] = useState(false);
    const [midiInputs, setMidiInputs] = useState<string[]>([]);

    useEffect(() => {
        if (navigator.requestMIDIAccess) {
            setMidiSupported(true);
            navigator.requestMIDIAccess().then((access) => {
                const inputs: string[] = [];
                access.inputs.forEach((input) => inputs.push(input.name ?? 'Unknown'));
                setMidiInputs(inputs);
            }).catch(() => {
                console.warn('MIDI access denied');
            });
        }
    }, []);

    return (
        <div style={{
            backgroundColor: '#222',
            color: '#fff',
            padding: '10px',
            borderRadius: '8px',
            minWidth: '220px'
        }}>
            <h4 style={{ marginBottom: '10px' }}>MIDI Controller Mapping</h4>
            {midiSupported ? (
                <>
                    <p>Available Controllers:</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {midiInputs.length > 0 ? (
                            midiInputs.map((name, idx) => (
                                <li key={idx} style={{
                                    background: '#333',
                                    padding: '5px 8px',
                                    borderRadius: '4px',
                                    marginBottom: '5px'
                                }}>{name}</li>
                            ))
                        ) : (
                            <li>No controllers detected</li>
                        )}
                    </ul>
                </>
            ) : (
                <p>MIDI not supported in this browser.</p>
            )}
        </div>
    );
};

export default MIDIControllerPanel;
