import React, { useEffect, useState } from 'react'
import { CircularProgress, Container, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import { Octokit } from '@octokit/core';
import PersonIcon from '@mui/icons-material/Person';
export const Home = () => {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false);
    const searchUser = async (query='') =>{
      const octokit = new Octokit({
        auth:'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'
      })
      if(query){
        setUsers([]);
        const res = await octokit.request('GET /search/users', {q:query})
        setUsers(res.data.items);
        setLoading(false);
      }
    }
    const handleOnChange = (e) =>{
        setLoading(true);
        setQuery(e.target.value);
    }
    useEffect(() => {
      searchUser(query);
    }, [query])
    
  return (
    <Container maxWidth="sm">
        <Grid container spacing={2} alignItems="center"
        justifyContent="center" direction="column">
        <Grid item xs={12} md={12}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Search User
        </Typography>
        <div><TextField id="outlined-basic" label="User..." variant="outlined" onChange={handleOnChange} /></div>
        { loading && <CircularProgress />}
            <List dense={true}>
            {
                users.map((user)=>{
                    return (
                    <ListItem key={user.id}>
                        <ListItemButton component="a" href={`/user/${user.login}`}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={user.login} />
                        </ListItemButton>
                    </ListItem>)
                })
            }
            </List>
        </Grid>
        </Grid>
      </Container>
  )
}
