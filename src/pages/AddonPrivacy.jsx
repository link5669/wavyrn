import WavNavbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import "./AddonPrivacy.css";

const EFFECTIVE_DATE = "October 7, 2026";
const CONTACT_EMAIL = "contact@wavyrn.com";

// Privacy policy for the "Wavyrn Blog" Google Docs add-on (google-docs-addon/).
// Keep it in sync with what the add-on actually reads, stores, and sends.
const AddonPrivacy = () => (
    <>
        <WavNavbar showLogo={true} />
        <main className="privacy-page">
            <article className="privacy-content">
                <h1>Wavyrn Blog Add-on Privacy Policy</h1>
                <p className="privacy-effective">Effective {EFFECTIVE_DATE}</p>

                <p>
                    Wavyrn Blog is a Google Docs add-on that lets members of the Wavyrn team publish a
                    Google Doc as a post on the Wavyrn blog at wavyrn.com. This policy explains what
                    information the add-on accesses, how it is used, and how you can have it removed.
                </p>

                <h2>Information the add-on accesses</h2>
                <ul>
                    <li>
                        <strong>The document you publish.</strong> When you click <em>Publish</em>, the
                        add-on exports the Google Doc you have open, including its text, formatting and
                        images. It reads the document only at that moment, and only that document.
                    </li>
                    <li>
                        <strong>Nothing else in your Google account.</strong> The add-on does not read your
                        other documents or Drive files, your email, contacts, calendar or profile
                        information. Its Drive permission is used only to export the open document.
                    </li>
                    <li>
                        <strong>Your blog editor password.</strong> The password you enter to sign in is
                        sent to Wavyrn's server to verify it. The add-on does not store it.
                    </li>
                </ul>

                <h2>How the information is used</h2>
                <p>
                    The document is used only to create or update a post on the Wavyrn blog. The add-on
                    reads the title, subtitle, author, date and body from the document, uploads the
                    document's images, and sends the result to Wavyrn's server to be published.
                </p>

                <h2>Where the information is stored</h2>
                <ul>
                    <li>
                        <strong>Published posts</strong> (text, formatting, selected topics and images)
                        are stored in Google Firebase (Cloud Firestore and Cloud Storage), operated for
                        Wavyrn by Google.
                    </li>
                    <li>
                        <strong>Posts are public.</strong> Once published, a post can be read by anyone
                        who visits wavyrn.com.
                    </li>
                    <li>
                        <strong>A sign-in token</strong> is stored in your Apps Script user properties so
                        you don't need to enter the password each time. It expires after 24 hours and is
                        removed when you click <em>Sign out</em>.
                    </li>
                    <li>
                        <strong>The published post's ID and topics</strong> are stored with the document,
                        in its Apps Script document properties, so publishing the document again updates
                        the same post.
                    </li>
                </ul>

                <h2>Sharing</h2>
                <p>
                    Wavyrn does not sell your information, use it for advertising, or share it with
                    anyone other than the service providers needed to run the blog (Google, which
                    hosts the data). Wavyrn does not use information from the add-on to train
                    artificial intelligence or machine learning models.
                </p>
                <p>
                    Wavyrn Blog's use and transfer of information received from Google APIs will adhere
                    to the{" "}
                    <a
                        href="https://developers.google.com/terms/api-services-user-data-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Google API Services User Data Policy
                    </a>
                    , including the Limited Use requirements.
                </p>

                <h2>Retention and deletion</h2>
                <ul>
                    <li>Published posts and their images are kept until they are deleted from the blog.</li>
                    <li>
                        To have a post or its images removed, email{" "}
                        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                    </li>
                    <li>
                        You can revoke the add-on's access to your Google account at any time in your{" "}
                        <a
                            href="https://myaccount.google.com/permissions"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Account permissions
                        </a>
                        . Revoking access does not remove posts that were already published.
                    </li>
                </ul>

                <h2>Security</h2>
                <p>
                    Information is sent between the add-on, Wavyrn's server and Google over encrypted
                    (HTTPS) connections, and publishing requires the blog editor password.
                </p>

                <h2>Changes to this policy</h2>
                <p>
                    If this policy changes, the updated version will be posted on this page with a new
                    effective date.
                </p>

                <h2>Contact</h2>
                <p>
                    Questions about this policy can be sent to{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
            </article>
        </main>
        <Footer />
    </>
);

export default AddonPrivacy;
