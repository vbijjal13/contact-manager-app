async function run() {
  const { isValidEmail, isValidPassword } = await import("../src/app/_helpers/validator.js");

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  const failures = [];

  // email tests
  try {
    assert(isValidEmail("user@example.com"), "valid email should pass");
    assert(!isValidEmail("user@"), "invalid email should fail");
    assert(!isValidEmail(""), "empty email should fail");
  } catch (e) {
    failures.push(e.message);
  }

  // password tests
  try {
    assert(isValidPassword("Abcdef1!"), "valid password should pass");
    assert(!isValidPassword("short1!"), "short password should fail");
    assert(!isValidPassword("allletters!!"), "password without digit should fail");
    assert(!isValidPassword("12345678!"), "password without letter should fail");
    assert(!isValidPassword("NoSpecial1"), "password without special char should fail");
  } catch (e) {
    failures.push(e.message);
  }

  if (failures.length === 0) {
    console.log("All validator tests passed");
    process.exitCode = 0;
  } else {
    console.error("Validator tests failed:\n", failures.join("\n"));
    process.exitCode = 1;
  }
}

run().catch((err) => {
  console.error("Test runner crashed:", err);
  process.exitCode = 2;
});
