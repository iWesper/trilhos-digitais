<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Introdução</DialogTitle>
      <DialogDescription>
      {tutorialMessages[currentMessageIndex]}
      </DialogDescription>
      <Button onClick={handleContinue}>Continuar</Button>
    </DialogHeader>
  </DialogContent>
</Dialog>
