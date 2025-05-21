import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Box,
    Typography,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import CloseIcon from '@mui/icons-material/Close'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Question from '../components/Questions';

const videoList = [
    {
        id: 1,
        title: 'Video 1',
        videoId: 'dQw4w9WgXcQ',
    },
    {
        id: 2,
        title: 'Video 2',
        videoId: '3JZ_D3ELwOQ',
    },
    {
        id: 3,
        title: 'Video 3',
        videoId: 'tgbNymZ7vqY',
    },
]

const PlayButtonWithPopup: React.FC = () => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<typeof videoList[0] | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
        setSelected(videoList[0])
        setIsPlaying(false)
    }
    const handleClose = () => {
        setOpen(false)
        setSelected(null)
        setIsPlaying(false)
    }
   
    const handleVideoSelect = (video: typeof videoList[0]) => {
        setSelected(video)
        setIsPlaying(false)
    }   
   
    const handlePlayClick = () => {
        setIsPlaying(true)
    }
    const handleCopyLink = () => {
        if (!selected) return
        const url = `https://youtu.be/${selected.videoId}`
        navigator.clipboard.writeText(url)
        setSnackbarOpen(true)
    }

    return (
        <>
            <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                onClick={handleOpen}
            >
                Play
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Sample Videos</Typography>
                        <IconButton onClick={handleClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <Box
                        position="relative"
                        paddingTop="56.25%"     
                        mb={2}
                        bgcolor="grey.900"
                        sx={{
                            backgroundImage: selected
                                ? `url(https://img.youtube.com/vi/${selected.videoId}/hqdefault.jpg)`
                                : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {selected && (
                            <IconButton
                                onClick={handleCopyLink}
                                size="small"
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    bgcolor: 'rgba(0,0,0,0.5)',
                                    color: '#fff',
                                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                                }}
                            >
                                <ContentCopyIcon fontSize="small" />
                            </IconButton>
                        )}
                        {selected && !isPlaying && (
                            <Box
                                position="absolute"
                                top="50%"
                                left="50%"
                                sx={{ transform: 'translate(-50%, -50%)' }}
                            >
                                <IconButton
                                    onClick={handlePlayClick}
                                    sx={{
                                        fontSize: 80, color: '#fff', bgcolor: 'red',
                                        '&:hover': {
                                            bgcolor: 'darkred',
                                        },
                                    }}
                                >
                                    <PlayArrowIcon fontSize="inherit" />
                                </IconButton>
                            </Box>
                        )}
                        {selected && isPlaying && (
                            <iframe
                                src={`https://www.youtube.com/embed/${selected.videoId}?autoplay=1`}
                                title={selected.title}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        )}
                        {!selected && (
                            <Box
                                position="absolute"
                                top="50%"
                                left="50%"
                                sx={{ transform: 'translate(-50%, -50%)' }}
                            >
                                <IconButton
                                    onClick={() => handleVideoSelect(videoList[0])}
                                    sx={{ fontSize: 80, color: '#fff' }}
                                >
                                    <PlayArrowIcon fontSize="inherit" />
                                </IconButton>
                            </Box>
                        )}
                    </Box>

                    <Box display="flex" gap={2} mt={2} justifyContent="center">
                        {videoList.map((video) => (
                            <Box
                                key={video.id}

                                onClick={() => handleVideoSelect(video)}
                                sx={{

                                    maxWidth: '120px',
                                    minWidth: '120px',
                                    p: 1,
                                    height: '100px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    border: selected?.id === video.id ? '2px solid' : '1px solid #ccc',
                                    borderColor: selected?.id === video.id ? 'primary.main' : 'transparent',
                                    backgroundImage: `url(https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg)`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    '&:hover': { borderColor: 'primary.main' },
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        bgcolor: 'rgba(0,0,0,0.5)',
                                        color: '#fff',
                                        px: 1,
                                        borderRadius: 1,
                                    }}
                                >
                                    {video.title}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default PlayButtonWithPopup
