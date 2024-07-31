// [Deprecation] Listener added for a 'DOMNodeInserted' mutation event. 에러 이 라이브러리 쓰면 뜸.

import { useCallback, useRef } from 'react';

import ReactQuill from 'react-quill';

import usePostEventDescriptionImage from '@query/event/usePostEventDescriptionImage';

import 'react-quill/dist/quill.snow.css';

export default function Index({
  value,
  onChange,
  communityId,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  communityId: number;
  placeholder?: string;
}) {
  const reactQuillRef = useRef<ReactQuill>(null);

  const { mutateAsync: postEventDescriptionImage } =
    usePostEventDescriptionImage();

  // 임시로 지정

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('community_id', String(communityId));
        formData.append('image', file as File);

        const imageURL = await postEventDescriptionImage(formData);
        const quill = reactQuillRef.current;
        if (quill) {
          const range = quill.getEditorSelection();
          quill
            .getEditor()
            .insertEmbed(range!.index, 'image', imageURL.image_url);
        }
      }
    };
  }, [communityId, postEventDescriptionImage]);

  return (
    <ReactQuill
      ref={reactQuillRef}
      theme="snow"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      modules={{
        toolbar: {
          container: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
              { list: 'ordered' },
              { list: 'bullet' },
              { indent: '-1' },
              { indent: '+1' },
            ],
            ['link', 'image', 'video'],
            ['code-block'],
            ['clean'],
          ],
          handlers: {
            image: imageHandler,
          },
        },
        clipboard: {
          matchVisual: false,
        },
      }}
      formats={[
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'code-block',
      ]}
    />
  );
}
