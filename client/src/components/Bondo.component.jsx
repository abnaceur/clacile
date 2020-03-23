import React from 'react';
import Modal from "react-responsive-modal";

class ModalInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: true,
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    render() {
        return (
            <Modal
                open={this.state.isModalOpen}
                onClose={this.closeModal}
                center
            // classNames={{ modal: "modal-disconnect", closeButton: "modal-disconnect-close_button" }}
            >
                <div style={{display :'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
                    <div>
                        Votre session a expiré.
                    </div>
                    <p className="modal-disconnect-paragraph centered">
                        Pour accèder à nos services, veuillez vous reconnecter.
                    </p>
                    <p className="modal-disconnect-paragraph centered">
                        Vous allez être redirigé dans quelques secondes.
                    </p>
                </div>
            </Modal>
        )
    }
}

export default ModalInfo;