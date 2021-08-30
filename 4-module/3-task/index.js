function highlight(table) {
  let row = table.querySelectorAll('tr');
  let columnStatus;
  let columnGender;
  let columnAge;

  for (let i = 0; i < row[0].children.length; i++) {
    if (row[0].children[i].innerHTML === 'Status') {
      columnStatus = i;
    }

    if (row[0].children[i].innerHTML === 'Gender') {
      columnGender = i;
    }

    if (row[0].children[i].innerHTML === 'Age') {
      columnAge = i;
    }
  }

  let classContainer = {
    m: 'male',
    f: 'female',
    true: 'available',
    false: 'unavailable'
  };

  for (let j = 1; j < row.length; j++) {
    let classStatus = row[j].children[columnStatus];

    if (classStatus.hasAttributes('data-available')) {
      let elem = classStatus.getAttribute('data-available');
      
      classStatus.parentNode.classList.add(classContainer[elem]);
    } else {
      classStatus.parentNode.hidden = true;
    }

    let classGender = row[j].children[columnGender];

    classGender.parentNode.classList.add(classContainer[classGender.innerHTML]);

    let classAge = row[j].children[columnAge].innerHTML;

    if (classAge < 18) {
      classGender.parentNode.style.textDecoration = 'line-through';
    }

  }

}

