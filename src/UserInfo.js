import { CircularProgress, Grid, List, ListItem, ListItemText, makeStyles, Typography } from '@mui/material';
import { Octokit } from '@octokit/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export const UserInfo = () => {
    const {username} = useParams();
    const [userData, setuserData] = useState([])
    const [loading, setLoading] = useState(true);
    const getUserInfo = async (username) =>{
        const octokit = new Octokit({
            auth:'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'
          })
          if(username){
            const res = await octokit.request('GET /search/users', {q:`user:${username}`});
            setuserData(res.data.items[0]);
            setLoading(false);
          }
    }
    useEffect(() => {
    
        getUserInfo(username)
    
    }, [])
  

     
    return (
        <Grid container spacing={0} alignItems="center"
        justifyContent="center" direction="column">
            <Grid item xs={12} md={12}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                User Info
            </Typography>
            { loading && <CircularProgress />}
                <List dense={false}  >
                {
                    Object.entries(userData).map(([key, value]) => {
                        return(
                                    <ListItem key={key} >
                                        <ListItemText
                                            primary={`${key} : ${value}`}
                                        />
                                    </ListItem>
                            )
                            }
                        )
                } 
                </List>
            </Grid>
        </Grid>
    )
}
