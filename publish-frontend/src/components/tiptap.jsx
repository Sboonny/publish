import {
  faBold,
  faCode,
  faHeader,
  faImage,
  faItalic,
  faListOl,
  faLink,
  faListUl,
  faQuoteLeft,
  faStrikethrough
} from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback } from 'react';
import Youtube from '@tiptap/extension-youtube';
import { Markdown } from 'tiptap-markdown';
import Code from '@tiptap/extension-code';
import CharacterCount from '@tiptap/extension-character-count';

function ToolBar({ editor }) {
  const addImage = useCallback(() => {
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url, alt: '' }).run();
    }
  }, [editor]);

  const addYoutubeEmbed = () => {
    const url = window.prompt('URL');

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480
      });
    }
  };

  const addLink = () => {
    const url = window.prompt('URL');

    if (url) {
      editor.commands.setLink({ href: url, target: '_blank' });
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='row'
      p='0.2rem'
      marginTop='1rem'
      border='1px solid silver'
      borderRadius='lg'
      overflowX='auto'
    >
      <Button
        variant='ghost'
        iconSpacing={0}
        p={2}
        title='Add bold text'
        aria-label='Add bold text'
        leftIcon={<FontAwesomeIcon icon={faBold} />}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <Button
        variant='ghost'
        iconSpacing={0}
        p={2}
        title='Add italic text'
        aria-label='Add italic text'
        leftIcon={<FontAwesomeIcon icon={faItalic} />}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <Button
        variant='ghost'
        iconSpacing={0}
        p={2}
        title='Add strikethrough text'
        aria-label='Add strikethrough text'
        leftIcon={<FontAwesomeIcon icon={faStrikethrough} />}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />
      <Button
        variant='ghost'
        iconSpacing={0}
        p={2}
        title='Add code'
        aria-label='Add code'
        leftIcon={<FontAwesomeIcon icon={faCode} />}
        onClick={() => editor.chain().focus().toggleCode().run()}
      />
      <Button
        variant='ghost'
        iconSpacing={0}
        p={2}
        title='Add blockquote'
        aria-label='Add blockquote'
        leftIcon={<FontAwesomeIcon icon={faQuoteLeft} />}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
      <div className='vl'></div>
      <Menu>
        <MenuButton
          as={Button}
          variant='ghost'
          title='select heading text'
          aria-label='select heading text'
          iconSpacing={0}
          leftIcon={<FontAwesomeIcon icon={faHeader} />}
        />
        <MenuList as='ul' listStyleType='none'>
          <li>
            <MenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              Add heading 1
            </MenuItem>
          </li>
          <li>
            <MenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              Add heading 2
            </MenuItem>
          </li>
          <li>
            <MenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              Add heading 3
            </MenuItem>
          </li>
          <li>
            <MenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
            >
              Add heading 4
            </MenuItem>
          </li>
          <li>
            <MenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 5 }).run()
              }
            >
              Add heading 5
            </MenuItem>
          </li>
          <li>
            <MenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 6 }).run()
              }
            >
              Add heading 6
            </MenuItem>
          </li>
        </MenuList>
      </Menu>
      <div className='vl'></div>
      <Button
        variant='ghost'
        iconSpacing={0}
        p={2}
        title='Add a bullet List'
        aria-label='Add a bullet List'
        leftIcon={<FontAwesomeIcon icon={faListUl} />}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <Button
        variant='ghost'
        iconSpacing={0}
        p={2}
        title='Add an ordered List'
        aria-label='Add an ordered List'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        leftIcon={<FontAwesomeIcon icon={faListOl} />}
      />
      <div className='vl'></div>
      <Button
        variant='ghost'
        iconSpacing={0}
        p={2}
        title='add an image'
        aria-label='add an image'
        leftIcon={<FontAwesomeIcon icon={faImage} />}
        onClick={() => addImage()}
      />
      <Menu>
        <MenuButton
          as={Button}
          iconSpacing={0}
          title='Select embed content'
          aria-label='Select embed content'
          leftIcon={<FontAwesomeIcon icon={faCode} />}
          variant='ghost'
        />
        <MenuList as='ul' listStyleType='none'>
          <li>
            <MenuItem onClick={() => addYoutubeEmbed()}>YouTube</MenuItem>
          </li>
          <li>
            <MenuItem>Twitter</MenuItem>
          </li>
        </MenuList>
      </Menu>
      <Button
        variant='ghost'
        iconSpacing={0}
        p={2}
        title='Add a link'
        aria-label='Add a link'
        leftIcon={<FontAwesomeIcon icon={faLink} />}
        onClick={() => addLink()}
      />
    </Box>
  );
}

const Tiptap = ({ handleContentChange, content }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false
        }
      }),
      Placeholder.configure({
        // Use a placeholder:
        placeholder: 'Write something …'
      }),
      Image.configure({
        inline: true
      }),
      Youtube.configure({
        width: 480,
        height: 320
      }),
      Link.configure({
        protocols: ['http', 'https', 'mailto', 'tel']
      }),
      Markdown.configure({
        transformPastedText: true
      }),
      Code.configure({
        HTMLAttributes: {
          class: 'code'
        }
      }),
      CharacterCount.configure({})
    ],
    content: content ? content : '',
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'prose focus:outline-none'
      }
    },
    onUpdate: async ({ editor }) => {
      handleContentChange(editor.getHTML());
    }
  });

  const words = editor?.storage.characterCount.words();

  return (
    <>
      <ToolBar editor={editor} />
      <Prose>
        <EditorContent editor={editor} />
      </Prose>
      <Box right='50px' bottom='50px' zIndex='1' position='fixed'>
        <Text
          fontSize='xl'
          opacity={0.6}
          backgroundColor='white'
          padding='0.5rem'
        >
          {words === 1 ? `${words} word` : `${words} words`}
        </Text>
      </Box>
    </>
  );
};

export default Tiptap;
