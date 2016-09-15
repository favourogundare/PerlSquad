# CTT DUPLICATED GENE ANNOTATION
#### TEAM NAME: PerlSquad <perlsquadou@gmail.com>
- Alex Mayle <am218112@ohio.edu>
- Brian Reynolds <br058215@ohio.edu> 
- Eric Keep <ek349112@ohio.edu> 
- Favour Ogundare <fo893113@ohio.edu> 
- Robert Smith <rs659612@ohio.edu> 

#### CLIENT: Zhihua Hua <hua@ohio.edu>
	Availability: 6:30 - 7:00 pm Tuesday/Thursday
	Preferred Method of Communication: E-mail
	
#### INITIAL PROJECT DESCRIPTION

> What is the maximum number of genes encoded in each     genome?

Students work to answer this question by ‘finalizing’ a PERL-based annotation code, 
that implements a closing Target Trimming algorithm, to re-annotate the missing genes in their preferred genomes. 

#### INTENDED USER BASE
Academia, Bioinformatics Personnel. 

#### FIRST ADOPTER USER GROUP
Academia, Bioinformatics Personnel.

#### EQUIPMENT NEEDS

	Machine running Perl with required dependencies:
		Bioperl, BioPro, GeneWIse, PFam Database, Blast & HMMER3.
    
    Current Requirements:
        - Tools/Server for Web-Site for developed stand alone program. 
        - Eventually, student research assistants along with other 
          professors for alpha/beta testing 

#### FEATURES
> Executable File:- specific to eukaryotic systems :- application is not web based
    
-  Application takes input from user in the firm of annotation file, sequence of proteins and family name.
    
- Application finds genome, then finds where previous annotation file missed genes and or potential new genes, translate new signs, using dependency GeneWise to use previous annotated sequences.
- Application outputs how many genes belong to input's family.
	: Genomic DNA Sequence, Annotation Transcript sequence, Peptide Sequence


#### INITIAL USE CASES & USAGE SCENARIOS
>Academia and bio-informatics personnel can use the application to better annotate genome sequences which may be incomplete due to duplicate genes. 

- The application uses a Closing Target Trimming (CTT) algorithm along with predictions from dependencies like GeneWIse, PFam database, BLASTx and HMMER3 to gather two or more references allowing for unbiased annotation.

- The application can in turn be used for accurate predictions for a transcript model, that is the protein code as opposed to the pseudogene, thus confirming an accurate model. 

- Bioinformatics personnel may use the application to   annotate  incomplete genomes.

- A Biology professor may use the application to correctly predict genome sequences for a given plant family.

- A student researcher may use the application to  predict the transcript model of each non-annotated potential FBX locus.


#### NON-FUNCTIONAL REQUIREMENTS
> Security is not a priority, all code used will have open source propiety rights
> Dependencies and requirements for the program will be listed on the eventual site 
> and the executables FAQ.

#### GUI MOCKUPS
>Negligible, all commands run from commandline.

#### ARCHITECTURE
> Pictures attached in GitHub Repo
The finished application will take user input in the forms of genome sequence, protein sequence and family.

#### HELLO WORLD DEMO
> Perl Script, To be run In-Class

#### MILESTONES
1. Run through the segmented algorithm successfully on several different servers.

2. Create Universal version  of the algorithm application that can be run as one executable package. 
		
3. Optimize perl scripts and application. algorithm
	
4. Create website to host the algorithm,  paper and downloadable package.
