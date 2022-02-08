interface UpdateDetails {
  updateDetails: {
    user: string
    subject: 'PAGE' | 'WORKSPACE' | 'BLOCK'
    updateType: 'EDITED' | 'CREATED' | 'DELETED'
    url: string
  }
}

export default UpdateDetails
