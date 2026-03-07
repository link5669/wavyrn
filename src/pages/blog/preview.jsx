import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./blog.css";
import { useTranslation } from "../../hooks/useTranslation";

const DEFAULT_PREVIEW_IMAGE = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600";

const Preview = ({ isMobile, title, image, author, date, tags, content, link, allTags }) => {
    const { t } = useTranslation();

    const getTagDisplayName = (tag) => {
        if (typeof tag === "string") {
            const currentLang = localStorage.getItem("selectedLanguage") || "en";
            const allTagsArray = [...(allTags?.TOPIC || []), ...(allTags?.PROJECT || []), ...(allTags?.GENRE || [])];
            const tagObj = allTagsArray.find((t) => t.name === tag);
            if (tagObj && currentLang === "jp" && tagObj.nameJP) return tagObj.nameJP;
            return tag;
        }
        const currentLang = localStorage.getItem("selectedLanguage") || "en";
        if (currentLang === "jp" && tag.nameJP) return tag.nameJP;
        return tag.name;
    };

    // Take first 280 chars for preview; strip custom blocks so they don't show as raw
    const rawTrimmed =
        typeof content === "string"
            ? content.substring(0, 280).trim() + (content.length > 280 ? "..." : "")
            : "";
    const excerpt = rawTrimmed
        .replace(/\{image:[^}]+\}/g, "")
        .replace(/\{youtube:[^}]+\}/g, "")
        .replace(/\{player:[^}]+\}/g, "")
        .replace(/\{video:[^}]+\}/g, "")
        .replace(/\{color:#[A-Fa-f0-9]{6}\}(.*?)\{\/color\}/gs, "$1")
        .replace(/\{indent:\d+\}(.*?)\{\/indent\}/gs, "$1")
        .trim();

    // Convert bold/italic markdown (asterisks) to HTML so asterisks never show (handles truncated or unclosed ** / *)
    const excerptForRender = excerpt
        .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*\*$/g, "") // orphan ** at end from truncation
        .replace(/\*([^*\s][^*]*?)\*/g, "<em>$1</em>")
        .replace(/\*$/g, ""); // orphan * at end

    const imgSrc = image && image !== "" ? image : DEFAULT_PREVIEW_IMAGE;

    return (
        <article className={`blog-preview-card ${isMobile ? "blog-preview-card--mobile" : ""}`}>
            <div
                className="blog-preview-card-image-wrap"
                style={{ backgroundImage: `url(${imgSrc})` }}
                role="img"
                aria-label=""
            >
                <img src={imgSrc} alt="" className="blog-preview-card-image-sr-only" />
            </div>
            <div className="blog-preview-card-body">
                <h2 className="blog-preview-card-title">{title}</h2>
                <p className="blog-preview-card-date">{date}</p>
                {tags && tags.length > 0 && (
                    <div className="blog-preview-card-tags">
                        {tags.map((tag, index) => (
                            <span key={index} className="blog-preview-card-tag">
                                {getTagDisplayName(tag)}
                            </span>
                        ))}
                    </div>
                )}
                {excerptForRender ? (
                    <div className="blog-preview-card-excerpt">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            children={excerptForRender}
                        />
                    </div>
                ) : null}
                <Link to={link} className="blog-preview-card-cta">
                    {t("common.learnMore")} →
                </Link>
            </div>
        </article>
    );
};

export default Preview;
