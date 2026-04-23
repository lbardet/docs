
# Data rectification

Under [Article 16](https://gdpr-info.eu/art-16-gdpr/), the GDPR sets forth the right of data subjects to obtain from the controller without undue delay the rectification of inaccurate personal data concerning them. A similar provision can also be found in other data protection laws, such as the CCPA.

In the context of the idOS, rectification is made possible in the sense that an idOS user is able to update their private profile by adding, editing, and even deleting new wallet addresses with ownership verified, attributes, or credentials at any time via the [User Data Dashboard](../../how-it-works/functionality/user-data-dashboard.md). This possibility can function as an additional mechanism for controllers to be able to comply with such data subjects’ requests for data rectification.

If an access grant has been given by a user to a third party for certain data, that data is duplicated and re-encrypted with the viewer keys. If later in time the user updates any of the information previously shared on their User Data Dashboard, those changes are not reflected in the duplicated and re-encrypted data that the viewer has access to, and it will also lack verification by an identity provider, meaning a new access grant for the updated data needs to be given by the user for that third party to have access to it, which can choose to trust it or not, considering it is unverified.

As mentioned above, user inputs stored on the idOS are unverified, meaning they are signed by the user only. In turn, the reliability of third parties on such inputs can significantly decrease. However, once users add more wallet addresses that they control to their accounts, it comes with underlying verifiable signatures. As a result, third parties know the user actually controls such wallets.
