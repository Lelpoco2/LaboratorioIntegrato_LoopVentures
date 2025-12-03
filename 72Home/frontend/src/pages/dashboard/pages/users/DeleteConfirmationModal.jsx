import React from 'react';
import './DeleteConfirmationModal.css';

export default function DeleteConfirmationModal({ data, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content delete-confirmation" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Conferma Eliminazione</h2>
                    <button className="close-button" onClick={onCancel}>&times;</button>
                </div>
                <div className="modal-body">
                    <p className="warning-message">
                        Stai per eliminare l'utente <strong>{data.userName}</strong>.
                    </p>
                    
                    {data.hasRelatedData && (
                        <div className="related-data-warning">
                            <p><strong>ATTENZIONE:</strong> Questa operazione eliminerà anche:</p>
                            <ul>
                                {data.relatedEvaluationsCount > 0 && (
                                    <li>{data.relatedEvaluationsCount} valutazione/i immobiliare/i</li>
                                )}
                                {data.relatedPropertiesCount > 0 && (
                                    <li>{data.relatedPropertiesCount} immobile/i associato/i</li>
                                )}
                            </ul>
                            <p className="irreversible-warning">
                                Questa azione è <strong>irreversibile</strong> e cancellerà permanentemente tutti i dati correlati.
                            </p>
                        </div>
                    )}
                    
                    <p className="confirmation-question">
                        Sei sicuro di voler procedere?
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onCancel}>
                        Annulla
                    </button>
                    <button className="btn-delete-confirm" onClick={onConfirm}>
                        Elimina Definitivamente
                    </button>
                </div>
            </div>
        </div>
    );
}
