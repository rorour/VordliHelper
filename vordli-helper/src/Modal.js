import { CButton, CModal, CModalTitle, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';
import { useEffect, useState } from 'react';


const Modal = () => {
    const [visible, setVisible] = useState(false)
    return (
      <>
        <CButton color="primary" onClick={() => setVisible(!visible)}>Launch demo modal</CButton>
        <CModal
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalHeader>
            <CModalTitle id="LiveDemoExampleLabel">Modal title</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>Woohoo, you're reading this text in a modal!</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary">Save changes</CButton>
          </CModalFooter>
        </CModal>
      </>
    )
}
 
export default Modal;