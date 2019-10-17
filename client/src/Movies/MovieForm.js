import React from 'react'
import axios from 'axios'

function MovieForm(props) {
    const id = props.match.params.id

    const [input, setInput] = React.useState({
        director: '',
        metascore: '',
        stars: '',
        title: '',
    })

    React.useEffect(()=>{
        if (id) axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setInput({
                    ...res.data,
                    metascore: String(res.data.metascore),
                    stars: res.data.stars.join(', '),
                })
            })
            .catch(err => console.log(err.response));
    },[id])

    function inputHandler(e) {
        setInput({...input, [e.target.name]: e.target.value})
    }

    function submitHandler(e) {
        e.preventDefault()
        if (id) {
            axios.put(`http://localhost:5000/api/movies/${id}`, {
                ...input,
                metascore: Number(input.metascore),
                stars: input.stars.split(',').map(str => str.trim())
            })
            .then(resp => {
                // console.log(resp)
                props.history.push('/')
            })
            .catch(err => console.log(err.response))
        }
    }

    return (
        <form className="movie-card" onSubmit={submitHandler}>
            <h4>Edit a Movie</h4>
            <label style={{display: 'block', margin: '1rem 0'}}>
                Title:&nbsp;
                <input
                    type='text'
                    name='title'
                    placeholder='Title'
                    title='Title'
                    value={input.title}
                    onChange={inputHandler}
                />
            </label>
            <label style={{display: 'block', margin: '1rem 0'}}>
                Director:&nbsp;
                <input
                    type='text'
                    name='director'
                    placeholder='Director'
                    title='Director'
                    value={input.director}
                    onChange={inputHandler}
                />
            </label>
            <label style={{display: 'block', margin: '1rem 0'}}>
                Metascore:&nbsp;
                <input
                    type='number'
                    name='metascore'
                    placeholder='Metascore'
                    pattern='\d{1,2}|100' // 0-100
                    min='0'
                    max='100'
                    title='Metascore must be a number between 0 and 100'
                    value={input.metascore}
                    onChange={inputHandler}
                />
            </label>
            <label style={{display: 'block', margin: '1rem 0'}}>
                Star Actor(s):&nbsp;
                <input
                    type='text'
                    style={{width: '75%'}}
                    name='stars'
                    placeholder='Star Actor(s) (for multiple, separate by comma: ",")'
                    title='Star Actor(s) (for multiple, separate by comma: ",")'
                    value={input.stars}
                    onChange={inputHandler}
                />
            </label>
            <button className='home-button'>Submit</button>
        </form>
    )
}

export default MovieForm