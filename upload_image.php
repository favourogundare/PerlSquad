<?php
if(is_array($_FILES)) {
	if(is_uploaded_file($_FILES['userImage']['tmp_name'])) {
		$sourcePath = $_FILES['userImage']['tmp_name'];
		$targetPath = "Pictures/Animals/".$_POST['subDir']."/".$_FILES['userImage']['name'];
		if (move_uploaded_file($sourcePath, $targetPath)) {
			?>
			<img src="<?php echo $targetPath; ?>">
			<?php
			exit();
		}
	}
}
?>