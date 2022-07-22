import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './EditPost.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from "../../redux/slices/auth";
import { useNavigate, Navigate, useParams, Link } from 'react-router-dom';
import axios from '../../axios'

import 'easymde/dist/easymde.min.css';
import { fetchCriateNewPost, fetchEditPost } from '../../redux/slices/post';

export const AddPost = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)
    //const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const { data } = await axios.post('/upload', formData)
      setImageUrl(data.url)
    } catch (err) {
      console.warm(err)
      alert('Ошибка при загрузке файла')
    }
  }
  const onClickRemoveImage = () => {
    setImageUrl('')
  };


  // const onSubmit = async (values) => {
  //   const data = await dispatch(fetchAuth(values))

  //   if (!data.payload) {
  //     return alert('Не удалось авторизироваться')
  //   }

  //   if ('token' in data.payload) {
  //     window.localStorage.setItem('token', data.payload.token)
  //   }
  // }


  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);




  const onSubmit = async () => {
    try {
      //setLoading(true)

      const fields = {
        title,
        text,
        imageUrl,
        tags,
      }
      const patchData = { id, fields }
      // const { data2 } = await dispatch(fetchCriateNewPost(fields));

      // const { data } = await dispatch(fetchEditPost(patchData));
      // console.log(data);


      const data = isEditing
        ? await dispatch(fetchEditPost(patchData))
        : await dispatch(fetchCriateNewPost(fields))
      const _id = isEditing ? id : data.payload._id

      navigate(`/fullPost/${_id}`)

    } catch (err) {
      console.warn(err)
      alert('Ошибка при создании статьи')
    }
  }

  React.useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setTitle(data.title)
        setText(data.text)
        setImageUrl(data.imageUrl)
        setTags(data.tags.join(','))
      }).catch(err => {
        console.warn(err)
        alert('Ошибка при изменении статьи')
      })
    }
  }, [id])

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '200px',
      autofocus: true,
      placeholder: 'Введите текст...',
      //status: true,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'postText',
      },
      //autoRefresh:{ delay: 300 },
      //previewImagesInEditor: true,
      //previewRender: (text) => {'text'},
      //imageMaxSize:1024*1024*2,
      //sideBySideFullscreen:false,
      // forceSync: true,
      //      renderingConfig: {
      //   codeSyntaxHighlighting: true,
      // },

    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/' />
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()}
        variant="outlined" size="large">
        Загрузить превью
      </Button >
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <Link to="/">
          <Button size="large" variant="contained">Отмена</Button>
        </Link>
      </div>
    </Paper>

  );
};
