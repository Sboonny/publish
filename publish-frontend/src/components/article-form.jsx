import React from "react";
import { useState } from "react";
import Tiptap from "@/components/tiptap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";


const ArticleForm = ({ onSubmit, initialValues, onContentChange }) => {

  // show or not show drafts
  const [showDrafts, setShowDrafts] = useState(true);

  // show or not show pinned articles
  const [showPinned, setShowPinned] = useState(true);

  // show or not show published articles
  const [showPublished, setShowPublished] = useState(true);

  return (
    <div className="page">
      <div className="side-drawer">
        <div className="navigation">
          <button>
            <h2 className="icon-margin"><FontAwesomeIcon icon={faLongArrowAltLeft} /><span>Go Back</span></h2>
          </button>
        </div>
        <button className="dropdown-button" onClick={() => setShowDrafts(!showDrafts)}
        ><h2>Drafts</h2></button>
        {showDrafts && (
          <>
            <div>
              <ol>
                <li>Article 1</li>
                <li>Article 2</li>
                <li>Article 3</li>
              </ol>
            </div>
          </>
        )}
        {/* show pinned articles */}

        <button className="dropdown-button" onClick={() => setShowPinned(!showPinned)}><h2>Pinned</h2></button>
        {showPinned && (
          <>
            <div>
              <ol>
                <li>Article 4</li>
                <li>Article 5</li>
                <li>Article 6</li>
              </ol>
            </div>
          </>
        )}
        {/* show published articles */}
        <button className="dropdown-button" onClick={() => setShowPublished(!showPublished)} ><h2>Published</h2></button>
        {showPublished && (
          <>
            <div>
              <ol>
                <li>Article 7</li>
                <li>Article 8</li>
                <li>Article 9</li>
              </ol>
            </div>
          </>
        )}
        <button className="submit-button draft-button" type='submit'>
          Save Draft
        </button>
      </div>
      <div className='article-container'>
        <div className="header">
          <div className="title" id="title">
            <span>Article Title</span>
            <FontAwesomeIcon icon={faEdit} />
          </div>
          <div className="buttons">
            <button className="preview-button">
              Preview
            </button>
            <button className="submit-button">
              Publish
            </button>
          </div>
        </div>
        <div className="editor">
          <br />
          <Tiptap
            onChange={onContentChange}
            defaultValue={initialValues?.attributes?.body}
          />
        </div>
      </div>
    </div>

  );
};

export default ArticleForm;
